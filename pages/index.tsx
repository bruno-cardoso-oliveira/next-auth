import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { FormEvent, useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import styles from '../styles/Home.module.css'
import { withSSRGuest } from '../utils/withSSRGuest';

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn } = useContext(AuthContext);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault(); // faz com que o ao dar submit a página não de um refresh (comportamento padrão do submit)

    const data = {
      email,
      password,
    }

    await signIn(data)
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <h1>Hello</h1>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Entrar</button>
    </form>
  )
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
});