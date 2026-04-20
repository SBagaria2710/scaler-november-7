import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, message } from "antd";
import { getShowsByMovie } from "../api/shows.js";
import { getMovieById } from "../api/movies.js";

const formatMinutesToHHMM = (minutes) => {
  const mins = Number(minutes) || 0;
  const hours = Math.floor(mins / 60);
  const remaining = mins % 60;
  return `${hours}h ${String(remaining).padStart(2, "0")}m`;
};

export default function MovieDetails() {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const getTodayYYYYMMDD = () => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const [movie, setMovie] = useState(null);
  const [shows, setShows] = useState([]);
  const [date, setDate] = useState(getTodayYYYYMMDD());

  const fetchMovie = async () => {
    try {
      const res = await getMovieById(movieId);
      if (res.success) {
        setMovie(res.data);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const fetchShows = async (selectedDate) => {
    try {
      const res = await getShowsByMovie(movieId, selectedDate);
      if (res.success) {
        setShows(res.data);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };


  // Auto fetch movie details and shows on first load
  useEffect(() => {
    if (movieId) {
      fetchMovie();
      fetchShows(date);
    }
  }, [movieId]);

  // Refetch when date changes
  useEffect(() => {
    if (movieId) {
      fetchShows(date);
    }
  }, [date, movieId]);


  // Group shows by theatre
  const groupedByTheatre = useMemo(() => {
    const map = {};
    for (const show of shows) {
      const theatreId = show.theatre?._id;
      if (!theatreId) continue;


      if (!map[theatreId]) {
        map[theatreId] = {
          theatre: show.theatre,
          shows: [],
        };
      }
      map[theatreId].shows.push(show);
    }


    return Object.values(map);
  }, [shows]);


  return (
    <div>
      <header className="App-header_base">
        {movie ? (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 24,
              alignItems: "flex-start",
              marginBottom: 24,
              color: "black"
            }}
          >
            <img
              src={movie.poster}
              alt={movie.title}
              style={{
                width: 240,
                height: 360,
                objectFit: "cover",
                borderRadius: 16,
                flexShrink: 0,
              }}
            />
            <div style={{ minWidth: 240, flex: 1, color: "black" }}>
              <h1 style={{ margin: 0, fontSize: 36 }}>{movie.title}</h1>
              <p style={{ margin: "12px 0 0", fontSize: 16, opacity: 0.85 }}>
                {movie.genre}
              </p>
              <div
                style={{
                  marginTop: 18,
                  display: "flex",
                  gap: 16,
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    padding: "8px 12px",
                    paddingLeft: 0,
                    borderRadius: 8,
                    fontSize: 14,
                  }}
                >
                  Duration: {formatMinutesToHHMM(movie.duration)}
                </span>
                {movie.language && (
                  <span
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      padding: "8px 12px",
                      borderRadius: 8,
                      fontSize: 14,
                    }}
                  >
                    {movie.language}
                  </span>
                )}
              </div>
              {movie.description && (
                <p style={{ marginTop: 18, lineHeight: 1.6, opacity: 0.9 }}>
                  {movie.description}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div style={{ marginBottom: 24 }}>
            <h2>Loading movie details...</h2>
          </div>
        )}

        <h2 style={{ marginBottom: 12 }}>Select Date</h2>

        <div style={{ marginBottom: 24 }}>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: 6,
              border: "1px solid #d1d5db",
              fontSize: 14,
              backgroundColor: "lightgray",
              color: "black",
            }}
          />
        </div>

        {groupedByTheatre.length === 0 ? (
          <p>No shows found for this movie on this date.</p>
        ) : (
          <div style={{ display: "grid", gap: 16 }}>
            {groupedByTheatre.map((group) => (
              <div
                key={group.theatre._id}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: 8,
                  padding: 16,
                }}
              >
                <div style={{ fontWeight: 600, fontSize: 16 }}>
                  {group.theatre.name}
                </div>
                <div style={{ opacity: 0.85 }}>{group.theatre.address}</div>

                <div
                  style={{
                    marginTop: 12,
                    display: "flex",
                    gap: 10,
                    flexWrap: "wrap",
                  }}
                >
                  {group.shows.map((show) => (
                    <Button
                      key={show._id}
                      onClick={() => navigate(`/book-show/${show._id}`)}
                    >
                      {show.time}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </header>
    </div>
  );
}
