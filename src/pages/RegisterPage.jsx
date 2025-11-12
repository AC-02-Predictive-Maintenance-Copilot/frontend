import RegisterInput from "@/components/RegisterInput";

function RegisterPage({ register, error, clearError }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-zinc-100 via-zinc-600 to-zinc-900">
      <RegisterInput register={register} error={error} clearError={clearError}/>
    </div>
  );
}

export default RegisterPage;
