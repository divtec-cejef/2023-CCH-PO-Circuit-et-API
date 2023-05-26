import { routeHandler } from '../../models';
import { checkStructureOrThrow } from 'check-structure';
import { authenticateSection, getPasswordBySectionName } from '../../services/authentication/implementation';
import bcrypt from 'bcrypt';

export const route: routeHandler<null, unknown, {section: string, password:string}> = async (req, res) => {
  try {
    checkStructureOrThrow(req.body, {
      section: String,
      password: String
    });
  } catch (e) {
    if (typeof e === 'string') {
      res.status(400).json({ message: e });
    } else if (e instanceof Error) {
      res.status(400).json({ message: e.message });
    } else {
      res.status(400).send();
    }
  }

  const { password } = req.body;
  const section = req.body.section.toLowerCase();

  const reqToken = await bcrypt.hash(password, 10);
  let dbPass = '';

  try {
    dbPass = await getPasswordBySectionName(section);
  } catch (e) {
    res.status(401).json({ message: 'Invalid credentials.' });
  }

  if (dbPass !== reqToken) {
    res.status(401).json({ message: 'Invalid credentials.' });
    return;
  }

  let token = '';

  try {
    token = await authenticateSection(section, password);
  } catch (e) {
    if (typeof e === 'string') {
      res.status(500).json({ message: e });
    } else if (e instanceof Error) {
      res.status(500).json({ message: e.message });
    } else {
      res.status(500).send();
    }
  }

  res.status(200).json({ token });
};

export default route;
