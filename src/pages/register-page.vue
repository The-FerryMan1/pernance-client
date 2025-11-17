<script setup lang="ts">
import defaultLayout from '@/layouts/default-layout.vue'
import z from 'zod'
import type { FormSubmitEvent, AuthFormField, ButtonProps } from '@nuxt/ui'
import { computed } from 'vue'

const toast = useToast()

const fields: AuthFormField[] = [
  {
    name: 'name',
    type: 'text',
    label: 'Name',
    placeholder: 'Enter your full name',
    required: true,
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
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
    name: 'confirm_password',
    label: 'Confirm Password',
    type: 'password',
    placeholder: 'Confirm your password',
    required: true,
  },
]

const links = computed<ButtonProps[]>(() => [
  {
    label: 'Sign in',
    to: { name: 'login' },
    color: 'neutral',
    variat: 'subtle',
    trailingIcon: 'i-lucide-arrow-left',
  },
])

const schema = z
  .object({
    name: z.string('Name is required').max(255, 'Name must not exceed 255 characters'),
    email: z.email('Invalid email'),
    password: z.string('Password is required').min(8, 'Must be atleast 8 characters'),
    confirm_password: z
      .string('Confirm password is required')
      .min(8, 'Must be atleast 8 characters'),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password don't match",
    path: ['confirm_password'],
  })

type Schema = z.infer<typeof schema>
async function submit(event: FormSubmitEvent<Schema>) {
  toast.add({
    title: 'Registration complete',
    description: 'You have successfully created an account',
    color: 'success',
  })
  console.log(event.data)
}
</script>

<template>
  <defaultLayout>
    <UPage>
      <UPageSection
        title="Create an account"
        description="Fill out the form to create an account"
        orientation="horizontal"
        headline="Sign up"
        :links
      >
        <UPageCard>
          <UAuthForm
            :schema="schema"
            title="Sign up"
            description="Enter your credentials to create an account."
            icon="i-lucide-user"
            :fields="fields"
            @submit="submit"
          />
        </UPageCard>
      </UPageSection>
    </UPage>
  </defaultLayout>
</template>
