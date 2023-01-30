/* eslint-disable no-var */

declare global {}

declare module '*.json' {
  const value: any
  export default value
}

export {}
