from http.server import BaseHTTPRequestHandler, HTTPServer
import json

class Handler(BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path.rstrip('/') == "/embed":
            length = int(self.headers.get('content-length', 0))
            body = self.rfile.read(length).decode('utf-8') if length else ''
            # ignore input, return dummy vector of length 1536
            embedding = [0.0] * 1536
            resp = json.dumps({"embedding": embedding})
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(resp)))
            self.end_headers()
            self.wfile.write(resp.encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()

    def log_message(self, format, *args):
        return

def run():
    server = HTTPServer(("0.0.0.0", 8001), Handler)
    print("Embed stub running on 0.0.0.0:8001")
    server.serve_forever()

if __name__ == "__main__":
    run()


