import { v2 as cloudinary } from 'cloudinary'
import path from 'path'
import type { Adapter } from '@payloadcms/plugin-cloud-storage/types'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Matches the "VISF" parent folder already created in the Cloudinary console
// (Media Library > Folders > VISF > jury / sponsors / banner / video / thumbnails).
const BASE_FOLDER = 'VISF'

const toAssetFolder = (subfolder?: string) => (subfolder ? `${BASE_FOLDER}/${subfolder}` : BASE_FOLDER)

// The delivery public_id is always flat (VISF/filename), independent of the
// asset_folder. This account uses Cloudinary's Dynamic Folder Mode, where the
// asset_folder (Media Library placement) is decoupled from public_id (the
// delivery URL) — so it can be moved between folders later without touching
// the URL. See setMediaAssetFolder below.
//
// The extension must be stripped: Cloudinary delivery URLs always parse
// whatever follows the last dot as the requested format and strip it before
// looking up the public_id, so a public_id containing a literal extension
// (e.g. "VISF/photo.jpg") is unreachable via its own delivery URL — a request
// for it gets normalized to "VISF/photo" and 404s.
const toPublicId = (filename: string) => {
  const base = path.parse(filename).name
  return `${BASE_FOLDER}/${base}`
}

// Moves an already-uploaded media asset into a different Cloudinary folder
// (e.g. from Jury.ts/Sponsors.ts hooks) without re-uploading or changing its URL.
export const setMediaAssetFolder = async (filename: string, subfolder: string) => {
  await cloudinary.api.update(toPublicId(filename), {
    resource_type: 'image',
    asset_folder: toAssetFolder(subfolder),
  })
}

export const cloudinaryAdapter: Adapter = ({ collection }) => {
  const resourceType = collection.slug === 'video' ? 'video' : 'image'

  return {
    name: 'cloudinary',
    // Without quality/fetch_format 'auto', Cloudinary serves the untouched
    // upload as-is (original resolution, original format) — this was why
    // production pages were downloading multi-MB originals for every image.
    generateURL: ({ filename }) =>
      cloudinary.url(toPublicId(filename), {
        secure: true,
        resource_type: resourceType,
        quality: 'auto',
        fetch_format: 'auto',
      }),
    handleDelete: async ({ filename }) => {
      await cloudinary.uploader.destroy(toPublicId(filename), {
        resource_type: resourceType,
      })
    },
    handleUpload: async ({ data, file }) => {
      const subfolder = (data as { prefix?: string } | undefined)?.prefix
      await new Promise<void>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            public_id: toPublicId(file.filename),
            asset_folder: toAssetFolder(subfolder),
            resource_type: resourceType,
            overwrite: true,
          },
          (error) => (error ? reject(error) : resolve()),
        )
        uploadStream.end(file.buffer)
      })
    },
    staticHandler: async (_req, { params: { filename } }) =>
      // Kept in sync with generateURL above — same reasoning applies here.
      Response.redirect(
        cloudinary.url(toPublicId(filename), {
          secure: true,
          resource_type: resourceType,
          quality: 'auto',
          fetch_format: 'auto',
        }),
        302,
      ),
  }
}
