<?php

namespace App\Repository;

use App\Entity\Question;
use Doctrine\Persistence\ManagerRegistry;
use DoctrineExtensions\Query\Mysql\Rand;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

/**
 * @extends ServiceEntityRepository<Question>
 *
 * @method Question|null find($id, $lockMode = null, $lockVersion = null)
 * @method Question|null findOneBy(array $criteria, array $orderBy = null)
 * @method Question[]    findAll()
 * @method Question[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class QuestionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Question::class);
    }

    public function save(Question $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Question $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @param string category
     * @param int limit
     * @return Question[] Return an array of Question object
     */
    public function getQuestionsForGame(string $category, int $limit) : array {
        return $this->createQueryBuilder('question')
            ->leftJoin('question.category', 'category')
            ->where('category.label_key = :category')
            ->setParameter('category', $category)
            ->orderBy('RAND()')
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult()
        ;
    }

    /**
     * Count all questions in the database
     * 
     * @return int
     */
    public function countQuestions() : int {
        return $this->createQueryBuilder("question")
            ->select("COUNT(question.id) as nbrQuestions")
            ->getQuery()
            ->getSingleResult()["nbrQuestions"]
        ;
    }
}
