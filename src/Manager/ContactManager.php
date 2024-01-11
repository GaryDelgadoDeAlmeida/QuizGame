<?php

namespace App\Manager;

use App\Entity\Contact;
use App\Repository\ContactRepository;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class ContactManager {
    private ParameterBagInterface $params;
    private ContactRepository $contactRepository;

    function __construct(ContactRepository $contactRepository, ParameterBagInterface $params)
    {
        $this->params = $params;
        $this->contactRepository = $contactRepository;
    }

    /**
     * @param string subject
     * @param string message
     * @param bool send mail
     * @return Contact|string Return a contact object or a message if an error has been encoutered
     */
    public function add(string $subject, string $message, bool $sendMail = false)
    {
        $contact = (new Contact())
            ->setSubject($subject)
            ->setMessage($message)
            ->setCreatedAt(new \DateTimeImmutable())
        ;

        try {
            // Save the contact (message) into databse
            $this->contactRepository->save($contact, true);

            // If we have to send an email
            if($sendMail) {
                $this->sendEmail($subject, $message);
            }
        } catch(\Exception $e) {
            return $e->getMessage();
        }

        return $contact;
    }

    public function sendEmail(string $subject, string $message)
    {
        return mail($this->params->get('email.admin'), $subject, $message, [
            "from" => "no-reply@freelance-accounting.com",
            'X-Mailer' => 'PHP/' . phpversion()
        ]);
    }
}