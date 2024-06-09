import axios from 'axios';

type ProblemResponse = {
  title: string;
  content: string | null;
  isPaidOnly: boolean;
  difficulty: string;
  exampleTestcases: string;
  hints: string[];
  sanpleTestcase: string;
  topicTags: { name: string; id: string; slug: string }[];
};

export const fetchLeetCodeProblem = async (title: string) => {
  const query = `
    query getQuestionDetail($titleSlug: String!) {
      question(titleSlug: $titleSlug) {
        title
        content
        difficulty
        exampleTestcases
        companyTagStats
        stats
        hints
        sampleTestCase

        topicTags {
          name
          id
          slug          
        }
        isPaidOnly
      }
    }
  `;

  const variables = {
    titleSlug: title,
  };

  const response = await axios.post<ProblemResponse>('https://leetcode.com/graphql', {
    query,
    variables,
  });

  const data = response.data;

  return data;
};
