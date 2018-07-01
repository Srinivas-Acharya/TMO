function processMessage($update) {
    if($update["result"]["action"] == "Order_Id"){
        sendMessage(array(
            "source" => $update["result"]["source"],
            "speech" => "Hello from webhook",
            "displayText" => "Hello from webhook",
            "contextOut" => array()
        ));
    }
}

function sendMessage($parameters) {
    echo json_encode($parameters);
}

$update_response = file_get_contents("php://input");
$update = json_decode($update_response, true);
echo "Hello $update["result"]["action"]!";
if (isset($update["result"]["action"])) {
    processMessage($update);
}