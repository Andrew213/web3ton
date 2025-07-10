export const generateNamespaces = (data: Record<string, unknown>[]) => {
  return data.map((item) => Object.keys(item)[0]);
};

export const generateResources = (data: Record<string, unknown>[]) => {
  const resources: Record<string, Record<string, string>> = {};

  data.forEach((item) => {
    const namespace = Object.keys(item)[0];
    Object.entries(item[namespace] as string).forEach(
      ([lang, translations]) => {
        if (!resources[lang]) {
          resources[lang] = {};
        }
        resources[lang][namespace] = translations;
      },
    );
  });

  return resources;
};
