import Board from "@/containers/Board";


export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mt-12 mb-6">Tic Tac Toe Game </h1>
      <Board />
    </div>
  );
}
