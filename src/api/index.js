import { getParameters } from 'codesandbox/lib/api/define';

export const fetchTemplate = async (endpoint) => {
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`Failed to fetch template (${response.status}): ${endpoint}`);
  }

  return response.text();
};

export const createSandbox = async (templateString) => {
  const parameters = getParameters({
    files: {
      'package.json': {
        content: {
          dependencies: {
            react: 'latest',
            'react-dom': 'latest',
            'react-scripts': 'latest',
          },
        },
      },
      'public/index.html': {
        content: "<div id='root'></div>",
      },
      'src/App.js': {
        content: templateString,
      },
      'src/index.js': {
        content:
          'import { StrictMode } from \'react\';\nimport { createRoot } from \'react-dom/client\';\n\nimport App from \'./App\';\n\nconst rootElement = document.getElementById("root");\nconst root = createRoot(rootElement)\n\nroot.render(<StrictMode><App /></StrictMode>);',
      },
    },
    template: 'create-react-app',
  });

  const response = await fetch(
    `https://codesandbox.io/api/v1/sandboxes/define?json=1&parameters=${parameters}`
  );

  if (!response.ok) {
    throw new Error(`Failed to create sandbox (${response.status})`);
  }

  const { sandbox_id } = await response.json();

  return sandbox_id;
};
