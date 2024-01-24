<?php

namespace App\Manager;

use App\Entity\Contact;
use App\Enum\ContactEnum;
use App\Repository\ContactRepository;
use Symfony\Component\HttpFoundation\Response;
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
     * @param array json content
     * @return array fields
     */
    public function checkFields(array $jsonContent) {
        $fields = [];
        $allowedFields = ContactEnum::getAvailableChoices();

        foreach($jsonContent as $fieldName => $fieldValue) {
            
            // Skip undesired fields
            if(!in_array($fieldName, $allowedFields)) {
                continue;
            }

            // All fields are required
            if(empty($fieldValue)) {
                throw new \Exeception("The '{$fieldName}' field must have a value", Response::HTTP_FORBIDDEN);
            }

            // Some fields have length contraints
            if(strlen($fieldValue) > 255 && in_array($fieldName, [ContactEnum::CONTACT_FIRSTNAME, ContactEnum::CONTACT_LASTNAME, ContactEnum::CONTACT_EMAIL, ContactEnum::CONTACT_SUBJECT])) {
                throw new \Exeception("The '{$fieldName}' field value can't exceed 255 caracters length", Response::HTTP_FORBIDDEN);
            }

            // Specific check on fields
            if(in_array($fieldName, [ContactEnum::CONTACT_FIRSTNAME, ContactEnum::CONTACT_LASTNAME])) {
                if(is_numeric($fieldName)) {
                    throw new \Exeception("The '{$fieldName}' field can't contain numeric value", Response::HTTP_FORBIDDEN);
                }
            } elseif($fieldName == ContactEnum::CONTACT_EMAIL) {
                if(!filter_var($fieldValue, FILTER_VALIDATE_EMAIL)) {
                    throw new \Exeception("The '{$fieldName}' field must have be a valid email", Response::HTTP_FORBIDDEN);
                }
            }

            $fields[$fieldName] = $fieldValue;
        }

        return $fields;
    }

    /**
     * @param array fields
     * @param bool send mail
     * @return Contact|string Return a contact object or a message if an error has been encoutered
     */
    public function fillContact(array $fields, bool $sendMail = false)
    {
        $subject = "[Information] Un message vous a été envoyé";
        $contact = (new Contact())
            ->setSubject($subject)
            ->setCreatedAt(new \DateTimeImmutable())
        ;

        foreach($fields as $fieldName => $fieldValue) {
            if($fieldName == ContactEnum::CONTACT_FIRSTNAME) $contact->setFirstname($fieldValue);
            elseif($fieldName == ContactEnum::CONTACT_LASTNAME) $contact->setLastname($fieldValue);
            elseif($fieldName == ContactEnum::CONTACT_EMAIL) $contact->setEmail($fieldValue);
            elseif($fieldName == ContactEnum::CONTACT_SUBJECT) $contact->setSubject($fieldValue);
            elseif($fieldName == ContactEnum::CONTACT_MESSAGE) $contact->setMessage($fieldValue);
        }

        try {
            $this->contactRepository->save($contact, true);

            if($sendMail) {
                $this->sendEmail($fields[ContactEnum::CONTACT_SUBJECT] ?? $subject, $fields[ContactEnum::CONTACT_MESSAGE]);
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

    public function sendEmailWithTemplate(string $to, string $subject, string $message) {
        return false;
    }
}