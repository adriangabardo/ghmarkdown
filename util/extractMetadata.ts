export interface Metadata {
  id: string;
  description?: string;
  image?: string;
}

export const extractMetadata = (content: string): Metadata[] => {
  try {
    const buf = Buffer.from(content, 'base64');
    const json = JSON.parse(buf.toString());

    const isValidMetadata = (obj: object): obj is Metadata[] =>
      Array.isArray(obj) && obj.filter((entry) => 'id' in entry).length > 0;

    if (!isValidMetadata(json)) return [];

    return json;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to extract metadata', error);

    return [];
  }
};
