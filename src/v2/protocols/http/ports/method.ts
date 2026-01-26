/*
 * Copyright (c) 2025 Yago Marinho
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete'

type HttpMethodMap = {
  GET: 'get'
  POST: 'post'
  PUT: 'put'
  PATCH: 'patch'
  DELETE: 'delete'
}

export const HttpMethod: HttpMethodMap = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete',
}
