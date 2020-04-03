const {
  ServiceBusClient
} = require("@azure/service-bus");
const topicName = "";
const connectionString = 'Endpoint=sb://...';

async function main() {

  const sbClient = ServiceBusClient.createFromConnectionString(connectionString)
  const topicClient = sbClient.createTopicClient(topicName);
  const sender = topicClient.createSender();


  const params = {
    body: {
      test: 'Hello'
    }
  };

  try {
    await sender.send(params);
    await topicClient.close();
  } catch (err) {
    console.log(err);
  } finally {
    await sbClient.close();
  }

}

main().catch((e) => {
  console.log(e);
});