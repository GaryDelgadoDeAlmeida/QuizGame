<?php

namespace App\Manager;

class CurlManager {

    /**
     * @param string url
     * @return array|null
     */
    public function callAPI(string $url) : array|null {
        $curl = curl_init();
        curl_setopt_array($curl, [
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_0,
        ]);

        $curlResponse = curl_exec($curl);
        $curlError = curl_error($curl);
        curl_close($curl);

        return [
            "response" => json_decode($curlResponse, true),
            "error" => $curlError
        ];
    }
}