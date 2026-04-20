import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../api/users";
import { getAllMovies } from "../api/movies";

const Home = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [meResponse, moviesResponse] = await Promise.all([
                    getCurrentUser(),
                    getAllMovies(),
                ]);

                if (meResponse?.data?.user) {
                    setUser(meResponse.data.user);
                }

                if (moviesResponse?.success) {
                    setMovies(moviesResponse.data);
                } else {
                    setMovies([]);
                }
            } catch (err) {
                setError("Failed to load home page data");
            }
        };

        fetchData();
    }, []);

    if (error) return <div>{error}</div>;
    if (!user) return <div>...Loading</div>;

    return (
        <div className="App-header_base">
            <h2>Home Component</h2>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <section style={{ marginTop: 20 }}>
                <h3>Available Movies</h3>
                {movies.length === 0 ? (
                    <p>No movies available.</p>
                ) : (
                    <ul style={{ listStyle: "none", padding: 0, display: "flex", flexWrap: "wrap", gap: 16 }}>
                        {movies.map((movie) => (
                            <li
                                key={movie._id || movie.id}
                                onClick={() => navigate(`/movie/${movie._id || movie.id}`)}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter" || event.key === " ") {
                                        navigate(`/movie/${movie._id || movie.id}`);
                                    }
                                }}
                                tabIndex={0}
                                style={{
                                    border: "1px solid #ddd",
                                    borderRadius: 8,
                                    padding: 12,
                                    display: "flex",
                                    gap: 12,
                                    alignItems: "flex-start",
                                    width: "100%",
                                    maxWidth: 340,
                                    flex: "1 1 280px",
                                    minWidth: 240,
                                    cursor: "pointer",
                                }}
                            >
                                <img
                                    src={movie.poster}
                                    alt={movie.title}
                                    style={{
                                        width: 120,
                                        height: 180,
                                        objectFit: "cover",
                                        borderRadius: 8,
                                        flexShrink: 0,
                                    }}
                                />
                                <div>
                                    <strong>{movie.title}</strong>
                                    <p style={{ margin: "8px 0 0" }}>
                                        {movie.language || movie.genre || movie.description}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
};

export default Home;