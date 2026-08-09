async function getHealth() {
  return {
    status: "ok",
    app: "Olympus Control",
    timestamp: new Date().toISOString(),
  };
}

export default async function HealthPage() {
  const health = await getHealth();

  return (
    <main>
      <h1>Health Check</h1>
      <p>Status: {health.status}</p>
      <p>App: {health.app}</p>
      <p>Timestamp: {health.timestamp}</p>
    </main>
  );
}