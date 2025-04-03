export function ItemDescription({ description, features }) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-3">Description</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
        
        {features && features.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-3">Features</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  {/* <CheckIcon className="h-4 w-4 text-primary" /> */}
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }