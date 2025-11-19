import RegisterInput from "@/components/RegisterInput";

function RegisterPage({ register }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-zinc-100 via-zinc-600 to-zinc-900">
      <RegisterInput register={register} />
    </div>
  );
}

export default RegisterPage;
