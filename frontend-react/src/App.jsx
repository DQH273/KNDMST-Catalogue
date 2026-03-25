import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const loadData = async () => {
    const res = await fetch("https://catalogue-backend-cfpg.onrender.com/api/culture");
    const result = await res.json();
    setData(result);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container py-4">
      <h1 className="text-center text-danger">Vietnam Culture Vibes</h1>
      <p className="text-center text-muted">Văn hóa Việt phiên bản Gen Z </p>

      <div className="row mt-4">
        {data.map((item) => (
          <div className="col-md-4 mb-4" key={item.id}>
            <div
              className="card shadow h-100"
              onClick={() => setSelectedItem(item)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={item.img}
                style={{ height: "200px", width: "100%", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="text-danger">{item.name}</h5>
                {/* Hiển thị mô tả đầy đủ */}
                <p>{item.desc}</p>
                <span className="badge bg-warning text-dark">{item.tag}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal hiển thị chi tiết */}
      {selectedItem && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedItem.name}</h5>
                <button
                  className="btn-close"
                  onClick={() => setSelectedItem(null)}
                ></button>
              </div>
              <div className="modal-body">
                <img
                  src={selectedItem.img}
                  className="img-fluid mb-3"
                  style={{ width: "100%", objectFit: "cover" }}
                />
                <p>
                  <strong>Mô tả:</strong>{" "}
                  {selectedItem.detail || selectedItem.desc}
                </p>
                {selectedItem.vibe && (
                  <p>
                    <strong>Vibe:</strong> {selectedItem.vibe}
                  </p>
                )}
                <span className="badge bg-warning text-dark">
                  {selectedItem.tag}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
