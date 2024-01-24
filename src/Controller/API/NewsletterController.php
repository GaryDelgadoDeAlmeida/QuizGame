<?php

namespace App\Controller\API;

use App\Entity\User;
use App\Repository\SubscribeRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api', name: 'api_')]
class NewsletterController extends AbstractController
{
    private User $user;
    private SubscribeRepository $subscribeRepository;

    function __construct(
        Security $security,
        SubscribeRepository $subscribeRepository
    ) {
        $this->user = $security->getUser();
        $this->subscribeRepository = $subscribeRepository;
    }

    #[Route('/newsletters', name: 'get_newsletters',methods: ["GET"])]
    public function get_newsletters(Request $request): JsonResponse
    {
        return $this->json([], Response::HTTP_OK);
    }

    #[Route('/subscribe', name: 'post_subscribe_newsletter', methods: ["POST"])]
    public function subscribe_newsletter(Request $request) : JsonResponse {
        // 
    }
}
