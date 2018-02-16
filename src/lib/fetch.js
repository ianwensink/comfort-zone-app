import fetch from 'fetch-everywhere';

export default async (...a) => {
  const res = await fetch(...a);
  return await res.json();
};
