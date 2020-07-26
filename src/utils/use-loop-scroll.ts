type CK<T> = T extends Promise<infer U> ? U : never

const BBB = (): Promise<{ hoge: string }> => {
  return new Promise((resolv, reject) => {
    resolv({ hoge: "jkjk" })
  })
}
