import {Container} from "@/components";
export function Footer() {
    return (
      <footer className="border-t">
        <Container>
        <div className="py-5 text-center">
          <p>
            &copy; {new Date().getFullYear()} Lost & Found. All rights reserved.
          </p>
        </div>
        </Container>
      </footer>
    )
  }