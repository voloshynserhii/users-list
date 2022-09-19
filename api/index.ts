import axios from 'axios';

function randomizedDelay<T>(maxDelay: number, callback: () => T): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      resolve(callback());
    }, Math.random() * maxDelay);
  });
}

function randomizedError<T>(errorRate: number, callback: () => T): Promise<T> {
  if (Math.random() < errorRate) {
    return Promise.reject(
      '500 Error!  I sense a great disturbance in the network.'
    );
  } else {
    return Promise.resolve(callback());
  }
}

const DEFAULT_MAX_DELAY = 3000;
const DEFAULT_ERROR_RATE = 0.5;

export function mockFetch<T>(
  { maxDelay, errorRate } = {
    maxDelay: DEFAULT_MAX_DELAY,
    errorRate: DEFAULT_ERROR_RATE
  },
  callback: () => T
): Promise<T> {
  console.log('Starting fetching of ' + callback.name);
  return randomizedDelay(maxDelay, () => callback())
    .then(result => randomizedError(errorRate, () => result))
    .then(
      result => {
        console.log('Successful fetch of ' + callback.name);
        return result;
      },
      error => {
        console.log('Error fetching ' + callback.name);
        throw error;
      }
    );
}

let nextIsSuccess = true;

export function fetchUsers(
  { maxDelay, errorRate } = {
    maxDelay: DEFAULT_MAX_DELAY,
    errorRate: DEFAULT_ERROR_RATE
  }
) {
  async function getUsers() {
    const res = await axios.get('https://dummyjson.com/users?limit=100&skip=0');
    return res.data.users
    
  }
  if (nextIsSuccess) {
    errorRate = 0;
  } else {
    errorRate = 1;
  }
  nextIsSuccess = !nextIsSuccess;
  return mockFetch({ maxDelay, errorRate }, getUsers);
}
