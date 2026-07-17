import { getPayload } from 'payload'
import config from '@payload-config'

/**
 * fetchFromCMS.ts
 *
 * En vez de hacer fetch() a la API REST de Payload, usamos getPayload()
 * directo — es más rápido (no hay ida y vuelta HTTP, corre en el mismo
 * proceso de Node) y es el patrón recomendado por Payload para Server
 * Components de Next.js.
 */
export async function getPayloadClient() {
  return getPayload({ config })
}