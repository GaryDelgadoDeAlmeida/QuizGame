<?php

namespace App\Command;

use App\Entity\Answer;
use App\Entity\Category;
use App\Entity\Question;
use App\Manager\CurlManager;
use App\Manager\AnswerManager;
use App\Manager\QuestionManager;
use App\Repository\AnswerRepository;
use App\Repository\CategoryRepository;
use App\Repository\QuestionRepository;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(
    name: 'app:generate:question-answers',
    description: 'Add a short description for your command',
)]
class GenerateQuestionAnswersCommand extends Command
{
    private CurlManager $curlManager;
    private AnswerManager $answerManager;
    private QuestionManager $questionManager;
    private AnswerRepository $answerRepository;
    private QuestionRepository $questionRepository;
    private CategoryRepository $categoryRepository;

    public function __construct(
        CurlManager $curlManager,
        AnswerManager $answerManager,
        QuestionManager $questionManager,
        AnswerRepository $answerRepository,
        QuestionRepository $questionRepository,
        CategoryRepository $categoryRepository
    ) {
        parent::__construct();
        $this->curlManager = $curlManager;
        $this->answerManager = $answerManager;
        $this->questionManager = $questionManager;
        $this->answerRepository = $answerRepository;
        $this->questionRepository = $questionRepository;
        $this->categoryRepository = $categoryRepository;
    }

    protected function configure(): void
    {
        $this
            // ->addArgument('arg1', InputArgument::OPTIONAL, 'Argument description')
            // ->addOption('option1', null, InputOption::VALUE_NONE, 'Option description')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $currentTime = new \DateTimeImmutable();
        $limit = 50; // max limit of the API is 50 elements
        $offset = 10;
        
        try {
            $api_response = $this->curlManager->callAPI("https://the-trivia-api.com/v2/questions?limit={$limit}&offset={$offset}");
            if($api_response["error"]) {
                throw new \Exception($api_response["error"]);
            }

            foreach($api_response["response"] as $quizQuestion) {
                if($this->questionRepository->findOneBy(["question" => $quizQuestion["question"]["text"]])) {
                    continue;
                }

                $category = $this->categoryRepository->findOneBy(["label_key" => $quizQuestion["category"]]);
                if(!$category) {
                    $category = (new Category())
                        ->setLabel($quizQuestion["category"])
                        ->setLabelKey($quizQuestion["category"])
                        ->setCreatedAt($currentTime)
                    ;

                    $this->categoryRepository->save($category, true);
                }

                $question = (new Question())
                    ->setCategory($category)
                    ->setQuestion($quizQuestion["question"]["text"])
                    ->setDifficulty($quizQuestion["difficulty"])
                    ->setMultipleAnswer(!is_string($quizQuestion["correctAnswer"]) ?? false)
                    ->setCreatedAt($currentTime)
                ;
                $this->questionRepository->save($question, true);

                $correctAnswer = (new Answer())
                    ->setQuestion($question)
                    ->setAnswer($quizQuestion["correctAnswer"])
                    ->setIsAnswer(true)
                    ->setCreatedAt($currentTime)
                ;
                $this->answerRepository->save($correctAnswer, true);

                foreach($quizQuestion["incorrectAnswers"] as $questionIncorrectAnswer) {
                    $incorrectAnswer = (new Answer())
                        ->setQuestion($question)
                        ->setAnswer($questionIncorrectAnswer)
                        ->setIsAnswer(false)
                        ->setCreatedAt($currentTime)
                    ;

                    $this->answerRepository->save($incorrectAnswer, true);
                }
            }

            $io->success('You have a new command! Now make it your own! Pass --help to see your options.');
        } catch(\Exception $e) {
            $io->error($e->getMessage());
        }

        return Command::SUCCESS;
    }
}
