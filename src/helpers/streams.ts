function readChunks(reader: ReadableStreamDefaultReader<Uint8Array>) {
  return {
    async *[Symbol.asyncIterator]() {
      let readResult = await reader.read();
      while (!readResult.done) {
        yield readResult.value;
        readResult = await reader.read();
      }
    },
  };
}

export async function readStreamsFromResponse({
  onData,
  onEnd,
  response,
}: {
  response: Response;
  onData: (text: string) => void;
  onEnd: () => void;
}) {
  const stream = response.body?.getReader();

  if (!stream) {
    onEnd();
    return;
  }

  const decoder = new TextDecoder();
  for await (const chunk of readChunks(stream)) {
    const content = decoder.decode(chunk);
    console.log({ content });
    onData(content);
  }

  onEnd();
}
