import { axiosInstance } from '../api/axiosInstance.ts';

const generateRandomUserId = (): string => {
  return Math.floor(Math.random() * 1e8)
    .toString()
    .padStart(8, '0');
};

const checkUserExists = async (userId: string): Promise<boolean> => {
  try {
    const response = await axiosInstance.get(`/api/check-user/${userId}`);
    return response.data.exists;
  } catch (error) {
    console.error('Error checking user:', error);
    return false;
  }
};

const ensureUniqueUserId = async (): Promise<number> => {
  let userId = await localStorage.getItem('usrid');
  if (localStorage.getItem('usrid')) {
    return Number(userId);
  }
  userId = generateRandomUserId();
  let userExists = await checkUserExists(userId);

  while (userExists) {
    console.log(`UserId ${userId} already exists. Generating a new one...`);
    userId = generateRandomUserId();
    userExists = await checkUserExists(userId);
  }

  localStorage.setItem('usrid', userId);
  console.log(`New unique userId generated and saved: ${userId}`);

  return Number(userId);
};

export default ensureUniqueUserId;
