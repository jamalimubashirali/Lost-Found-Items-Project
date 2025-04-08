export function ItemDescription({ description }) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-3">Description</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    );
  }