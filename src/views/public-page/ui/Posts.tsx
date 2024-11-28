import { Card } from '@/components/ui'

type Props = {
  posts: any
}
export const Posts = ({ posts }: Props) => {
  return (
    <Card>
      <div>
        {posts.items.map(post => {
          return (
            <div key={post.id}>
              <h2>{post.owner.firstName}</h2>
              <p>{post.owner.firstName}</p>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
