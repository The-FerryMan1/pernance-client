<script setup lang="ts">
import defaultLayout from '@/layouts/default-layout.vue'
import z from 'zod'
import type { FormSubmitEvent, AuthFormField, ButtonProps } from '@nuxt/ui'
import { computed } from 'vue'
import { authClient } from '../lib/auth-client.ts'
import { useRouter } from 'vue-router'


const router = useRouter()
const toast = useToast()

const fields: AuthFormField[] = [
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    required: true,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    required: true,
  },
  {
    name: 'remember',
    label: 'Remember me',
    type: 'checkbox',

  },
]

const links = computed<ButtonProps[]>(() => [
  {
    label: 'Sign up',
    to: { name: 'register' },
    color: 'neutral',
    variat: 'subtle',
    trailingIcon: 'i-lucide-arrow-left',
  },
])

const schema = z.object({
  email: z.email('Invalid email'),
  password: z.string('Password is required').min(8, 'Must be atleast 8 characters')
})

type Schema = z.infer<typeof schema>
async function submit(event: FormSubmitEvent<Schema>) {

  await authClient.signIn.email({
    email: event.data.email,
    password: event.data.password
  }, {
    onSuccess(ctx) {
      toast.add({ title: 'Authentication success', description: "You're signed in!", color: 'success' })
      router.push('/auth/dashboard')
    },
    onError(ctx) {
      toast.add({ title: 'Authentication failed', description: "Invalid email or password", color: 'error' })
    }
  })

}
</script>

<template>
  <defaultLayout>
    <UPage>
      <UPageSection title="Sign in with email" description="Manage your expenses now!" orientation="horizontal"
        headline="Sign in" :links>
        <UPageCard>
          <UAuthForm :schema="schema" title="Login" description="Enter your credentials to access your account."
            icon="i-lucide-user" :fields="fields" @submit="submit" />
        </UPageCard>
      </UPageSection>
    </UPage>
  </defaultLayout>
</template>
