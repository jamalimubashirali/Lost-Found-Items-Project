export function EmptyState({ message }) {
    return (
      <div className="border rounded-lg p-8 text-center">
        <p className="text-muted-foreground">{message}</p>
      </div>
    );
  }