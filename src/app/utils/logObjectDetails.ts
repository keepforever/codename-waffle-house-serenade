export function getBrightColor(str: string): string {
  // Create a hash of the string
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convert the hash to a bright hex color code
  let color = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
}

/**
 * Logs details of an object to the console, with each key-value pair on a new line.
 * The console group is labelled with the filename and coloured using a consistent bright color based on the filename.
 *
 * @param {Record<string, any>} objects - The objects to be logged. It is a record where each key-value pair represents an object to be logged.
 * @param {string} filename - The name of the file from which the log request originated.
 *
 * @param {string} [color] - The color to be used for the console group label. If not provided, a color will
 * be generated based on the filename.
 * @param {boolean} [shouldRender] - Allows for logging if an arbitrary conditional is met.
 *
 * @returns {void}
 */
export function logObjectDetails(
  objects: Record<string, any>,
  filename: string,
  color?: string,
  shouldRender?: boolean
): void {
  const isLocalhost = window.location.hostname === 'localhost';
  const isUAT = window.location.hostname === 'sendit.ninja';
  const searchParams = new URLSearchParams(window.location.search);
  /** if isDebugMode is true, the console will log regardless of the environment, allowing for logs in prod if necessary */
  const isDebugMode = searchParams.get('debug') === 'log';

  // Only log to the console if the app is running on localhost or UAT
  if (!(isLocalhost || isUAT) && !isDebugMode) return;

  // Prevent logging if the shouldRender condition is not met OR if it is undefined
  if (!shouldRender && shouldRender !== undefined && !isDebugMode) return;

  // Generate a consistent color based on the hash of the stringified objects

  console.group(
    `%c${filename}`,
    `color: ${
      color || getBrightColor(filename || '')
    }; font-size: 13px; font-weight: bold;`
  );

  Object.entries(objects).forEach(([key, obj]) => {
    console.info('\n', `${key} = `, obj, '\n');
  });

  console.groupEnd();
}
