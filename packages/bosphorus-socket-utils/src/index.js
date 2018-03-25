import { timeout, TimeoutError } from "promise-timeout";

export function once(socket, eventName) {
  return new Promise(resolve => {
    socket.once(eventName, resolve);
  });
}

export function onceOrTimeout(socket, eventName, timeoutMs) {
  return timeout(once(socket, eventName), timeoutMs);
}

export { timeout, TimeoutError };
