/**
 * Returns shuffled options with the index of the correct answer after shuffle.
 */
export function shuffleQuestionOptions(question) {
  const pairs = question.options.map((text, originalIndex) => ({
    text,
    originalIndex,
  }));

  for (let i = pairs.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }

  const correctShuffledIndex = pairs.findIndex(
    (p) => p.originalIndex === question.correctIndex
  );

  return {
    options: pairs.map((p) => p.text),
    correctShuffledIndex,
  };
}
