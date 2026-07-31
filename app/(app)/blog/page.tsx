import { Metadata } from 'next'
import BlogClient from './blog-client'

export const metadata: Metadata = {
  title: 'Blog & News | PowerMetz',
  description: 'Stay updated with the latest news, insights, and technological advancements in Battery Energy Storage Systems from PowerMetz.',
}

export default function BlogPage() {
  return <BlogClient />
}
