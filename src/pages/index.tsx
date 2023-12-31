import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { api } from "@/utils/api";
import Navbar from "@/components/Navbar/Navbar";
import useOnChange from "@/hooks/useOnChange";
import Input from "@/components/Input/Input";
import { useCallback, type SyntheticEvent } from 'react';
import Image from "next/image";
import { useEffect } from 'react';

export default function Home() {
  const { data: sessionData } = useSession();
  const { values, setValues, handleChange } = useOnChange({
    name: '',
    username: '',
    image: '',
  })

  useEffect(() => {
    if (!sessionData?.user) return;
    setValues({
      name: sessionData.user.name ?? '',
      username: sessionData.user.username ?? '',
      image: sessionData.user.image ?? '',
    })
  }, [sessionData?.user, setValues])

  const changeUserDataMutation = api.user.changeUserData.useMutation();
  const changeUserData = useCallback((e: SyntheticEvent) => {
    e.preventDefault();
    changeUserDataMutation.mutate(values)
  }, [changeUserDataMutation, values]);
  return (
    <>
      <Head>
        <title>Floating Chat App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="flex flex-col items-center gap-2 w-[400px] max-w-full">
            {sessionData?.user?.id && <form onSubmit={changeUserData} className="bg-level1 shadow-sm p-8 flex flex-col space-y-5 rounded-xl w-full">
              {sessionData?.user?.image && (
                <Image
                  alt="avatar image"
                  src={sessionData.user.image ?? ''}
                  className="mx-auto w-11 h-11 rounded-full"
                  width={44}
                  height={44}
                />
              )}
              <Input
                name="name"
                label='Change Name'
                value={values.name}
                onChange={handleChange}
                placeholder="Name"
              />
              <Input
                name="username"
                label='Change Username'
                value={values.username}
                onChange={handleChange}
                placeholder="Username"
              />
              <Input
                name="image"
                label='Change Image'
                value={values.image ?? ''}
                onChange={handleChange}
                placeholder="Image"
              />

              <button type="submit" className="h-9 w-full bg-primaryText text-invertedPrimaryText rounded-lg">Submit</button>
            </form>}
            <AuthShowcase />
          </div>
        </div>
      </main>
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-primaryText/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
