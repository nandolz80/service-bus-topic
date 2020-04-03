const { ServiceBusClient, ReceiveMode } = require("@azure/service-bus"); 

// Define connection string and related Service Bus entity names here

const topicName = "";
const connectionString = 'Endpoint=sb://...';
const subscriptionName = "signature..."; 

const onMessageHandler = async (brokeredMessage) => {
    console.log(brokeredMessage.body);
    if(brokeredMessage.body.origin == 'files'){
      console.log('complete');
      await brokeredMessage.complete();
    }else {
      brokeredMessage.defer()
    }
    
  };
  const onErrorHandler = (err) => {
    console.log("Error occurred: ", err);
  };

async function main(){
  const sbClient = ServiceBusClient
  .createFromConnectionString(connectionString)
  .createSubscriptionClient(topicName, subscriptionName)
  .createReceiver(ReceiveMode.peekLock)
  .registerMessageHandler(onMessageHandler, onErrorHandler, { autoComplete: false });
  
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});