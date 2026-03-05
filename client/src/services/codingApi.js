import axios from "axios";

// Using allorigins proxy for LeetCode because Heroku app was blocking CORS
export const getLeetCode = async (username) => {
    try {
        const res = await axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://leetcode-stats-api.herokuapp.com/${username}`)}`);
        return { data: JSON.parse(res.data.contents) };
    } catch (err) {
        return { data: null };
    }
};

export const getGithub = (username) =>
    axios.get(`https://api.github.com/users/${username}`);

export const getCodeChef = (username) =>
    axios.get(`https://codechef-api.vercel.app/${username}`);

export const getGFG = (username) =>
    axios.get(`https://gfgstatscard.vercel.app/${username}`);

export const getHackerRank = (username) =>
    axios.get(`https://hackerrank-stats-api.vercel.app/${username}`);