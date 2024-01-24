<?php

namespace App\Controller\API;

use App\Manager\ContactManager;
use App\Manager\SerializeManager;
use App\Repository\ContactRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api', name: 'api_')]
class ContactController extends AbstractController
{
    private ContactManager $contactManager;
    private SerializeManager $serializeManager;
    private ContactRepository $contactRepository;
    
    function __construct(ContactManager $contactManager, SerializeManager $serializeManager, ContactRepository $contactRepository) {
        $this->contactManager = $contactManager;
        $this->serializeManager = $serializeManager;
        $this->contactRepository = $contactRepository;
    }
    
    #[Route('/contacts', name: 'get_contacts', methods: ["GET"])]
    public function get_contacts(Request $request): JsonResponse
    {
        $limit = 20;
        $offset = is_numeric($request->get("offset")) && $request->get("offset") > 0 ? $request->get("offset") : 1;
        
        return $this->json([
            "offset" => $offset,
            "maxOffset" => ceil($this->contactRepository->countAll() / $limit),
            "data" => $this->serializeManager->serializeContent(
                $this->contactRepository->findBy([], ["created_at" => "DESC"], $limit, ($offset - 1) * $limit)
            )
        ], Response::HTTP_ACCEPTED);
    }

    #[Route("/contact", name: "post_contact", methods: ["POST"])]
    public function post_contact(Request $request) : JsonResponse 
    {
        $jsonContent = json_decode($request->getContent(), true);
        if(!$jsonContent) {
            return $this->json([
                "message" => "An error has been encountered with the sended body"
            ], Response::HTTP_PRECONDITION_FAILED);
        }

        try {
            $fields = $this->contactManager->checkFields($jsonContent);
            if(empty($fields)) {
                throw new \Exception("An error has been encountered with the sended body", Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            $contact = $this->contactManager->fillContact($fields, true);
            if(is_string($contact)) {
                throw new \Exception($contact, Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        } catch(\Exception $e) {
            return $this->json([
                "message" => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(null, Response::HTTP_CREATED);
    }

    #[Route("/contact/{:contactID}", name: "get_contact", methods: ["GET"])]
    public function get_contact(Request $request, int $contactID) : JsonResponse {
        $contact = $this->contactRepository->find($contactID);
        if(!$contact) {
            return $this->json([
                "message" => "Contact not found"
            ], Response::HTTP_NOT_FOUND);
        }

        return $this->json([
            "data" => $this->serializeManager->serializeContent($contact)
        ], Response::HTTP_OK);
    }
    
    #[Route("/contact/{:contactID}/remove", name: "get_contact", methods: ["DELETE"])]
    public function remove_contact(Request $request, int $contactID) : JsonResponse {
        $contact = $this->contactRepository->find($contactID);
        if(!$contact) {
            return $this->json([
                "message" => "Contact not found"
            ], Response::HTTP_NOT_FOUND);
        }

        try {
            $this->contactRepository->remove($contact, true);
        } catch(\Exception $e) {
            return $this->json([
                "message" => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(null, Response::HTTP_ACCEPTED);
    }

    #[Route("/contacts/remove", name: "remove_contacts", methods: ["DELETE"])]
    public function delete_contacts() : JsonResponse {
        $contacts = $this->contactRepository->findAll();
        
        try {
            foreach($contacts as $contact) {
                $this->contactRepository->remove($contact, true);
            }
        } catch(\Exception $e) {
            return $this->json([
                "message" => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(null, Response::HTTP_ACCEPTED);
    }
}
