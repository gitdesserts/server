import { Request, Response } from 'express';
import { getConnection } from 'typeorm';

const hasLastWeekResults = async () => {
  const { cnt } = (await getConnection().query(`
    SELECT
      COUNT(*) as cnt
    FROM result
    WHERE YEARWEEK(DATE_SUB(curdate(), INTERVAL 1 WEEK))=YEARWEEK(createAt)`))[0];
  return cnt !== 0;
};

const getThisWeekResults = async () => {
  await getConnection().query(`
    
  `);
};

export const findOne = async (req: Request, res: Response) => {
  let code = '';

  if (!(await hasLastWeekResults())) {
    code += 'A';
  } else {
    code += 'B';
  }

  const insight = (await getConnection().query(`
    SELECT * FROM desserts_development.insight order by rand() limit 1
  `))[0];

  res.send(insight);
};
