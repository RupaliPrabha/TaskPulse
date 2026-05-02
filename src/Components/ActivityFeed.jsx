export default function ActivityFeed({ activities }) {
  return (
    <div className='activity-feed'>
      <h3>Live Activity</h3>
      {activities.length === 0 ? (
        <p className="empty-activity">
          No recent activity yet 🚀
        </p>
      ) : (
        activities.slice(0, 5).map((act, i) => (
          <p key={i}>{act}</p>
        ))
      )}

    </div>
  )
}
