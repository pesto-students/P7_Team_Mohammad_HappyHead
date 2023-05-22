import meditationTools from '../components/toolsData';

export default function handler(req, res) {
  const {
    query: { id },
  } = req;

  const toolId = parseInt(id);
  const tool = meditationTools.find((tool) => tool.id === toolId);

  if (tool) {
    res.status(200).json(tool);
  } else {
    res.status(404).json({ message: 'Tool not found' });
  }
}
