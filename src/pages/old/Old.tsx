import image from '@assets/DSC03515.jpg';

const Old = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-4xl font-bold">Witamy u nas!</h1>
      <p className="text-lg mt-2">Cierpliwości, strona w budowie...</p>
      <img
        src={image}
        alt="Strona w budowie"
        className="mt-6 w-full max-w-xl rounded shadow-lg"
      />
      <p className="text-lg mt-4">
        Pela chciałaby Was już zaprosić, ale sorry, trzeba jeszcze trochę
        poczekać...
      </p>
    </div>
  );
};

export default Old;
