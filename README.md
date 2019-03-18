#ServiceWorker:
Service_worker nên đặt cùng chỗ với index.html để có thể quản lý URL của toàn bộ trang web. Ví dụ, đặt ở thư mục apps/service_worker.js thì Server Worker chỉ quản lý được các URL bắt đầu từ apps/.
Service_worker chỉ sử dụng được trên https và localhost nếu sử dụng chrome.
Hãy vào link này chrome://serviceworker-internals để xoá cache.echo # Service-worker
