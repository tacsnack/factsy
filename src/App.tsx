
import Container from '@mui/material/Container';
import { QUESTIONS } from './questions/MockQuestions';
import QuestionContainer from './questions/QuestionContainer';

function App() {
  return (
  <Container maxWidth="sm">
    <QuestionContainer questions={QUESTIONS}></QuestionContainer>
  </Container>
  );
}

export default App;
