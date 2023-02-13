const apiPort = 3000; // Number(process.env.API_PORT || 3000);

const rabbitMQHostname = "127.0.0.1"; // process.env.RABBITMQ_HOST || "127.0.0.1";
const rabbitMQPort = 5672; // Number(process.env.RABBITMQ_PORT || 5672);
const rabbitMQUsername = "guest"; // process.env.RABBITMQ_USERNAME || "guest";
const rabbitMQPassword = "guest"; // process.env.RABBITMQ_PASSWORD || "guest";
const rabbitMQScraperQueue = "google_scraper_queue"; // process.env.RABBITMQ_QUEUE || "google_scraper_queue";
const rabbitMQScraperQueueBrand = "brand_scraper_queue"; // process.env.RABBITMQ_QUEUE || "brand_scraper_queue";

const redisHost = "127.0.0.1"; // process.env.REDIS_HOST;
const redisPort = 6379; // process.env.REDIS_PORT;
const chromePath = "/usr/bin/google-chrome"; // process.env.CHROME_PATH;

export default {
  apiPort,
  rabbitMQHostname,
  rabbitMQPort,
  rabbitMQUsername,
  rabbitMQPassword,
  rabbitMQScraperQueue,
  rabbitMQScraperQueueBrand,
  redisHost,
  redisPort,
  chromePath,
};
